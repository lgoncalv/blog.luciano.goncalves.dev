---
title: "Posting Family Trees to Bluesky from the CLI"
publishedOn: 2026-06-27
description: "I added a new CLI command that builds a family tree from Neo4j and posts it as a Bluesky thread, using the same approach as the existing timeline command."
---

I've added a new command to create and post family tree threads on Bluesky.

It works in a similar way to the timeline command that I already had. To create a timeline, I can run:

```bash
cronolm story timeline ROLE_ID
```

For example, if the ID belongs to *Prime Minister of the United Kingdom*, the command gets that role from the `neo4j` database and finds all the related nodes connected with a `POSITION_HOLDER` edge.

```cypher
MATCH (n:Entity { id: $personEntityId })-[r]-(y)
WHERE type(r) IN $relationshipTypes
AND (r.start_date IS NOT NULL OR r.end_date IS NOT NULL OR r.point_date IS NOT NULL)
AND r.statement_id IS NOT NULL
RETURN
    n.id AS PersonId,
    coalesce(nullif(n.name, 'Unknown'), n.name_en, n.name_es) AS PersonName,
    n.image_url AS PersonImage,
    n.date_of_birth AS DateOfBirth,
    n.date_of_death AS DateOfDeath,
    type(r) AS RelationshipType,
    r.name AS RelationshipName,
    r.start_date AS StartDate,
    r.end_date AS EndDate,
    r.point_date AS PointDate,
    y.id AS RelatedEntityId,
    labels(y) AS RelatedEntityLabels,
    coalesce(nullif(y.name, 'Unknown'), y.name_en, y.name_es) AS RelatedEntityName,
    y.description_en AS RelatedEntityDescriptionEn,
    y.description_es AS RelatedEntityDescriptionEs,
    y.image_url AS RelatedEntityImage
ORDER BY coalesce(
    date(left(replace(toString(r.start_date), '""', ''), 10)),
    date(left(replace(toString(r.end_date), '""', ''), 10)),
    date(left(replace(replace(replace(replace(r.point_date, '""', ''), '+', ''), '-00-', '-01-'), '-00T', '-01T'), 10))
```

Once it has all the information, it builds the thread and posts each part slowly to avoid hitting Bluesky's rate limits.

You can see an example here: [Roman emperor timeline on Bluesky](https://bsky.app/profile/cronologia.bsky.social/post/3mpawxqgsud2v).

The new family tree command looks like this:

```bash
cronolm story family PERSON_ID
```

This one gets the person from `neo4j` and finds their direct family relationships: parents, partners, siblings, and children. It then builds the family tree thread and posts it on Bluesky.

```cypher
MATCH (ego:Human {id: $id})
/* ---------------- Parents ---------------- */
CALL {
    WITH ego
    CALL {
    WITH ego
    OPTIONAL MATCH (ego)-[r:FATHER|MOTHER]->(p:Human)
    WHERE r.statement_id IS NOT NULL
    RETURN p AS person,
            { relType: type(r), relProps: properties(r), direction: 'ego->parent' } AS relDetail
    UNION
    WITH ego
    OPTIONAL MATCH (p:Human)-[r:CHILD]->(ego)
    WHERE r.statement_id IS NOT NULL
    RETURN p AS person,
            { relType: type(r), relProps: properties(r), direction: 'parent->ego (via CHILD)' } AS relDetail
    }
    WITH person, relDetail WHERE person IS NOT NULL
    WITH person, collect(DISTINCT relDetail) AS relations
    RETURN collect({ person: person, relations: relations }) AS parents
}

/* ---------------- Children ---------------- */
CALL {
    WITH ego
    CALL {
    WITH ego
    OPTIONAL MATCH (ego)-[r:CHILD]->(c:Human)
    WHERE r.statement_id IS NOT NULL
    RETURN c AS person,
            { relType: type(r), relProps: properties(r), direction: 'ego->child' } AS relDetail
    UNION
    WITH ego
    OPTIONAL MATCH (c:Human)-[r:FATHER|MOTHER]->(ego)
    WHERE r.statement_id IS NOT NULL
    RETURN c AS person,
            { relType: type(r), relProps: properties(r), direction: 'child->ego (via FATHER|MOTHER)' } AS relDetail
    }
    WITH person, relDetail WHERE person IS NOT NULL
    WITH person, collect(DISTINCT relDetail) AS relations
    RETURN collect({ person: person, relations: relations }) AS children
}

/* ---------------- Partners ---------------- */
CALL {
    WITH ego
    OPTIONAL MATCH (ego)-[r:SPOUSE|UNMARRIED_PARTNER|PARTNER]-(p:Human)
    WHERE r.statement_id IS NOT NULL
    WITH ego, p AS person, r
    WHERE person IS NOT NULL
    WITH ego, person,
        collect(DISTINCT {
            relType: type(r),
            relProps: properties(r),
            direction: CASE WHEN startNode(r) = ego THEN 'ego->partner' ELSE 'partner->ego' END
        }) AS relations
    RETURN collect({ person: person, relations: relations }) AS partners
}

/* ---------------- Siblings, excluding ego's parents ---------------- */
CALL {
    WITH ego
    OPTIONAL MATCH (ego)-[:FATHER|MOTHER]->(p:Human)
    WITH ego, collect(DISTINCT p) AS egoParents

    CALL {
    WITH ego, egoParents
    OPTIONAL MATCH (ego)-[r:SIBLING]-(sib:Human)
    WHERE r.statement_id IS NOT NULL
    RETURN sib AS person,
            {
                kind: 'direct',
                relType: type(r),
                relProps: properties(r),
                direction: CASE WHEN startNode(r) = ego THEN 'ego->sib' ELSE 'sib->ego' END
            } AS relDetail
    UNION
    WITH ego, egoParents
    OPTIONAL MATCH (ego)-[rE:FATHER|MOTHER]->(par:Human)<-[rS:FATHER|MOTHER]-(sib:Human)
    WHERE rE.statement_id IS NOT NULL AND rS.statement_id IS NOT NULL
    RETURN sib AS person,
            {
                kind: 'viaParent',
                parent: par,
                egoRelType: type(rE),
                egoRelProps: properties(rE),
                sibRelType: type(rS),
                sibRelProps: properties(rS)
            } AS relDetail
    }

    WITH person, relDetail, egoParents
    WHERE person IS NOT NULL AND person <> ego AND NOT person IN egoParents
    WITH person, collect(DISTINCT relDetail) AS relations
    RETURN collect({ person: person, relations: relations }) AS siblings
}

RETURN ego, parents, children, partners, siblings;
```

You can see an example here: [George IV's family tree thread on Bluesky](https://bsky.app/profile/cronologia.bsky.social/post/3mp7q4565lt2n).

So now creating one of these threads is just a matter of finding the person's Wikidata ID and running the command.

The next step might be turning this into a Bluesky bot. Someone could mention the Cronologia account with something like:

```text
@cronologia.bsky.social family tree person_name
```

The bot could search for the person and reply with the generated family tree thread. I haven't built that part yet, but it feels like the obvious next step.