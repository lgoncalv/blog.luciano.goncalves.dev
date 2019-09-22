import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Post } from './posts/post';
import { PostSummary } from './posts/post-summary';

export class InMemoryPostService implements InMemoryDbService {
    createDb() {
        let posts: Post[] = [
            {
                id: '1',
                createdOn: 1569106524,
                title: 'title 1',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum turpis ut consectetur lacinia. Curabitur lobortis pellentesque justo, sit amet accumsan urna faucibus sed. Nulla in velit ante. Morbi dictum ac tellus eu viverra. Nullam quam elit, suscipit a varius ut, porta non nunc. Fusce lectus enim, lobortis ut ullamcorper eu, gravida ac purus. Aenean dictum arcu vel neque porttitor viverra. Integer scelerisque turpis in libero posuere, id pretium urna porta. Vivamus ullamcorper hendrerit suscipit. Aliquam lacus libero, blandit nec dapibus at, egestas ut risus. Morbi ornare ut enim consectetur gravida. Cras ut scelerisque lectus. Donec vitae lacinia tellus. Nam massa neque, tincidunt elementum eleifend id, pellentesque ac lacus. Suspendisse suscipit lacus quis convallis maximus. Morbi non risus non urna congue fermentum vestibulum vel lorem.

Vivamus finibus, massa a tincidunt dapibus, diam turpis convallis purus, \`non dignissim elit odio vitae nulla\`. Nam tempus mi ac sapien posuere convallis. Praesent tempor ante vitae sem vehicula laoreet. Praesent molestie velit nec consequat pellentesque. Nullam sed felis volutpat, convallis ex ut, consequat augue. Nam ornare diam eget massa eleifend tempor. Nulla ut arcu ac nunc volutpat pretium non facilisis nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris laoreet luctus tincidunt. Morbi ornare dapibus diam eget convallis. Cras aliquam ac magna eu ornare.

\`\`\`csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
\`\`\`

Phasellus ipsum neque, convallis nec augue eget, consectetur posuere eros. Donec interdum, tortor vitae tincidunt fermentum, tellus tortor aliquam risus, quis imperdiet ligula sem sit amet ex. Vestibulum id felis fringilla, sagittis lectus ac, blandit lorem. Phasellus sit amet tempor sem. In semper magna tortor, ac pellentesque mauris pulvinar et. Suspendisse eu lorem tempus, ultricies metus nec, sagittis eros. Sed cursus eget lectus vitae interdum. In hac habitasse platea dictumst. Duis molestie diam scelerisque nulla lacinia malesuada. Nulla volutpat nulla vel diam ullamcorper, eu viverra augue varius.`,
                slug: 'title-1'
            },
            {
                id: '2',
                createdOn: 1537401600,
                title: 'title 2',
                content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum turpis ut consectetur lacinia. Curabitur lobortis pellentesque justo, sit amet accumsan urna faucibus sed. Nulla in velit ante. Morbi dictum ac tellus eu viverra. Nullam quam elit, suscipit a varius ut, porta non nunc. Fusce lectus enim, lobortis ut ullamcorper eu, gravida ac purus. Aenean dictum arcu vel neque porttitor viverra. Integer scelerisque turpis in libero posuere, id pretium urna porta. Vivamus ullamcorper hendrerit suscipit. Aliquam lacus libero, blandit nec dapibus at, egestas ut risus. Morbi ornare ut enim consectetur gravida. Cras ut scelerisque lectus. Donec vitae lacinia tellus. Nam massa neque, tincidunt elementum eleifend id, pellentesque ac lacus. Suspendisse suscipit lacus quis convallis maximus. Morbi non risus non urna congue fermentum vestibulum vel lorem.</p>
                <p>Vivamus finibus, massa a tincidunt dapibus, diam turpis convallis purus, non dignissim elit odio vitae nulla. Nam tempus mi ac sapien posuere convallis. Praesent tempor ante vitae sem vehicula laoreet. Praesent molestie velit nec consequat pellentesque. Nullam sed felis volutpat, convallis ex ut, consequat augue. Nam ornare diam eget massa eleifend tempor. Nulla ut arcu ac nunc volutpat pretium non facilisis nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris laoreet luctus tincidunt. Morbi ornare dapibus diam eget convallis. Cras aliquam ac magna eu ornare.</p>
                <p>Phasellus ipsum neque, convallis nec augue eget, consectetur posuere eros. Donec interdum, tortor vitae tincidunt fermentum, tellus tortor aliquam risus, quis imperdiet ligula sem sit amet ex. Vestibulum id felis fringilla, sagittis lectus ac, blandit lorem. Phasellus sit amet tempor sem. In semper magna tortor, ac pellentesque mauris pulvinar et. Suspendisse eu lorem tempus, ultricies metus nec, sagittis eros. Sed cursus eget lectus vitae interdum. In hac habitasse platea dictumst. Duis molestie diam scelerisque nulla lacinia malesuada. Nulla volutpat nulla vel diam ullamcorper, eu viverra augue varius.</p>`,
                slug: 'title-2'
            }
        ];
        let postSummaries: PostSummary[] = [
            {
                id: '1',
                createdOn: 1569106524,
                title: 'title 1',
                summary: `Vivamus \`finibus\`, massa a **tincidunt dapibus**, diam turpis convallis purus, non dignissim elit odio vitae nulla. [Nam tempus mi ac sapien](https://google.com) posuere convallis. Praesent tempor ante vitae sem vehicula laoreet. Praesent molestie velit nec
                
consequat pellentesque. Nullam sed felis volutpat, convallis ex ut, consequat augue. Nam ornare diam eget massa eleifend tempor. Nulla ut arcu ac nunc volutpat pretium non facilisis nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris laoreet luctus tincidunt. Morbi ornare dapibus diam eget convallis. Cras aliquam ac magna eu ornare.
\`\`\`csharp
/*
 * C# Program to Check whether the Entered Number is Even or Odd
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
 
namespace check1
{
    class Program
    {
        static void Main(string[] args)
        {
            int i;
            Console.Write("Enter a Number : ");
            i = int.Parse(Console.ReadLine());
            if (i % 2 == 0)
            {
                Console.Write("Entered Number is an Even Number");
                Console.Read();
            }
            else
            {
                Console.Write("Entered Number is an Odd Number");
                Console.Read();
            }
        }
    }
}
\`\`\``,
                slug: 'title-1'
            },
            {
                id: '2',
                createdOn: 1537401600,
                title: 'title 2',
                summary: 'Maecenas tellus orci, iaculis sed enim vel, sollicitudin gravida libero. Phasellus ultrices vel enim sit amet tempus. Suspendisse scelerisque nulla a nunc aliquam, a mollis ipsum consequat. Vestibulum euismod libero in lectus pharetra tincidunt. Duis tincidunt nibh eu nibh tristique, ut semper erat tempor. Integer quis sodales tellus. Maecenas ut tristique quam.',
                slug: 'title-2'
            }
        ]
        return { posts, postSummaries };
    }
}