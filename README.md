# template-package

To use this template repository, you'll need [create yourself a new repository from it](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) and then in your own repository, change the following items:

1. Edit the file `package.json` and change the following items:

   - `name`
   - `description`
   - `repository` -> `url`
   - `bugs` -> `url`
   - `homepage`

2. Once this is done, generate your `package-lock.json` file by doing `npm install`.

3. Create yourself a `.env` file that will not be committed in git. Default looks pretty much like this:

```
AWS_PROFILE=development
AWS_SDK_LOAD_CONFIG=1
AWS_REGION=us-east-2
ENV=dev
REGION=us-east-2
```

4. Commit your initial files and you should be ready to go.
