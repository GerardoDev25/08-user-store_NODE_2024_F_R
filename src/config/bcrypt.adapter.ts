import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  },
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
