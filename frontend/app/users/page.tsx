'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const userSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'AGENT']).default('USER'),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: 'USER' },
  });

  const onSubmit = (data: UserFormData) => {
    console.log('User Data:', data);
    // Insert your API call here to create a new user
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium">
          Name
        </label>
        <Input id="name" placeholder="John Doe" {...register('name')} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-medium">
          Password
        </label>
        <Input id="password" type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {/* Role */}
      <div className="flex flex-col">
        <label htmlFor="role" className="mb-1 font-medium">
          Role
        </label>
        <select id="role" {...register('role')} className="p-2 border rounded">
          <option value="USER">User</option>
          <option value="AGENT">Agent</option>
        </select>
      </div>

      <Button type="submit">Create User</Button>
    </form>
  );
}
