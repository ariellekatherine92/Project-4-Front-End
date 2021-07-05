export const ADMINS = [
    'ariellekatherine92@gmail.com',
    'ledezmajane@gmail.com',
    'codychrist@hotmail.com',
];

export const isAdmin = user => ADMINS.includes(user?.email);
