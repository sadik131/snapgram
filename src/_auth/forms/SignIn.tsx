import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/shared/Loading"
import { SigninForm } from "@/lib/config"
import { useCreateUserMutation, useSignInMutation } from "@/lib/react-querie/query"

function SignIn() {
  const { mutateAsync: createUser, isPending } = useCreateUserMutation()
  const { mutateAsync: signInUser, isPending: signInLoading } = useSignInMutation()

  const form = useForm<z.infer<typeof SigninForm>>({
    resolver: zodResolver(SigninForm),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof SigninForm>) {
    const newUser = await createUser(values)

    if (!newUser) {
      return alert("user not create")
    }

    const session = await signInUser({ email: values.email, password: values.password })
    if (!session) {
      return alert("SignIn faild , please try again")
    }
  }

  return (
    <div className="flex gap-y-2 flex-col justify-center items-center">
      <img src="/img/logo.svg" alt="" />
      <h1 className="font-semibold text-xl">Create a new account</h1>
      <p className="font-medium text-gray-300">To use snapgram, Please enter your details</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="UserName" className="px-1 text-black w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" className="px-1 text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" className="px-1 text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-purple-600" type="submit">{isPending ? <><Loading /> <h1 className="mx-2">Loading</h1></> : "Submit"}</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn