Repo to illustrate an issue logged with Pulumi: https://github.com/pulumi/pulumi/issues/4621

###  Context 
We use a lib (Morphic - @morphic-ts/batteries) that keeps our code clean and strongly typed on all our projects. it is based on io-ts and uses native code. 

We are building a workflow to publish zips and consume them in our app: 
upload ZIP to s3 -> unzipped + other logic in step function -> consume from s3
There is quite some code and having everything in index.ts is not acceptable. 

We organized our code this way: 
- Models/aws... (using @morphic-ts/batteries to declare all models used in code)
- AWS/s3|lambda... - uses Models ( aws wrappers that manipulates S3 objects and use Models to return Morphic Objects)
- Functions/a|b|c.. - uses AWS (Lambda functions that uses aws wrappers and other wrappers)
- index.ts  - uses Functions

### Problem
We cannot find a way to not have serilization issue using this lib. The only way we can make it work is to import @morphic-ts/batteries at the top of index.ts, create Models within the lambda function callback itself and inject it down 3 levels 

Is there anyway to make this work? we have models everywhere and the only solution we found is unacceptable for maintenance and clarity reasons. 
