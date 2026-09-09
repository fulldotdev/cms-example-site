import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import Ajv from "ajv";
import pageSchema from "./schemas/page.json";
const ajv = new Ajv({allErrors:true});
const validate=ajv.compile(pageSchema);
const schema=z.record(z.unknown()).superRefine((data,ctx)=>{if(!validate(data))ctx.addIssue({code:"custom",message:ajv.errorsText(validate.errors)});});
export const collections={pages:defineCollection({loader:glob({pattern:"**/*.md",base:"./src/content/pages"}),schema}),blog:defineCollection({loader:glob({pattern:"**/*.md",base:"./src/content/blog"}),schema})};
