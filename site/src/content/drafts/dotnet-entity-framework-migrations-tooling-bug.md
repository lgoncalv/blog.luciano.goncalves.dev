Title: dotnet ef migrations add creates directory with backslash in name on Linux
Affected versions:
- .NET SDK 10.0.108
- .NET Runtime 10.0.4
- EF Core tools 10.0.3
What happened:
Running dotnet ef migrations add on Linux created a directory literally named bin\Debug (with a backslash character embedded in the directory name) alongside the correct bin/Debug output directory:
src/Cronologia.Curated.Persistence/
├── bin/
│   ├── Debug/          ← normal, gitignored
│   └── \Debug/         ← literal backslash in name: `bin\Debug`
│       └── net10.0/
│           ├── BuildHost-net472/   (~20 DLLs + satellite assemblies)
│           └── BuildHost-netcore/  (~15 files)
The .gitignore uses / as its path separator. Patterns like [Bb]in/ and [Dd]ebug/ did not match bin\Debug because \ is treated as a literal character in .gitignore, not as a path delimiter.
Result: ~40 BuildHost DLLs appeared as untracked files in git status.
Root cause: Somewhere in the EF Core CLI toolchain (likely MSBuild's output path construction or the design-time BuildHost), a Windows-style \ path separator leaks into directory paths on Linux, instead of using Path.DirectorySeparatorChar or /. The filesystem happily creates a directory with \ in the name since it's a valid character on Linux.
Fix: The fix is to include **/bin\*/ into the gitignore, but the real fix would be for the EF Core tooling to not use \ as separator.



Yes, well-known and tracked. Here's the lineage:
Issue	Date	What
#36142 (https://github.com/dotnet/efcore/issues/36142)	May 2025	Original — dotnet-ef migrations bundle broken on Linux, paths use \ instead of /
#36750 (https://github.com/dotnet/efcore/pull/36750)	PR	Fix for bundle command, but author noted "there might be other cases regressed"
#37506 (https://github.com/dotnet/efcore/issues/37506)	Jan 2026	Regression in 10.0.2 — dotnet-ef on Linux throws MSB3552 errors. Labeled regression, milestone 10.0.4
#37549 (https://github.com/dotnet/efcore/issues/37549)	Jan 2026	Same bug on macOS — traced root cause to Copy-Item "$contentFilesPath\*" $targetDir using hardcoded \ in the EF tooling scripts
#37680 (https://github.com/dotnet/efcore/issues/37680)	Feb 2026	Same bug for migrations add on Linux (exactly what we hit). Duplicate of #37506
Status: Duplicate, open, targeted for EF Core 10.0.4. The migrations bundle path was fixed in #36750 but the same root cause also affects migrations add (and potentially other commands) — that fix hasn't shipped yet.