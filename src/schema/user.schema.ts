import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'name is required'
        }),
        email: string({
            required_error: 'email is required'
        }).email('not a valid email'),
        password: string({
            required_error: 'password is required'
        }).min(6),
        passwordConfirmation: string({
            required_error: 'passwordConfirmation is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "passwords do not match",
        path: ['passwordConfirmation']
    } )
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;