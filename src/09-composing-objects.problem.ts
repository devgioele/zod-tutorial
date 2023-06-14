import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

const User = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

// Using `extend`
const Post = User.pick({ id: true }).extend({
  title: z.string(),
  body: z.string(),
});

// Using `merge` is more verbose
const Comment = z
  .object({
    text: z.string(),
  })
  .merge(User.pick({ id: true }));

// Same as above
const Comment2 = User.pick({ id: true }).merge(
  z.object({
    text: z.string(),
  })
);

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>
];
