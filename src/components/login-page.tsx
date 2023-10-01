import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { z } from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from './theme-provider';
import { ModeToggle } from './mode.toggle';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type User = z.infer<typeof userSchema>;

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid grid-cols-12 grid-rows-6 h-screen mx-2 md:mx-0">
        <div className="col-span-12 col-start-0 row-start-3 md:col-span-4 md:col-start-5">
          <form
            onSubmit={handleSubmit((data: User) => {
              axios
                .post('http://127.0.0.1:8000/auth/jwt/create/', data)
                .then((res) => {
                  localStorage.setItem('jwt-token', res.data.access);
                  navigate('/products');
                })
                .catch((err) => console.log(err));
              reset();
            })}
            className="p-4 shadow-sm shadow-slate-300 rounded"
          >
            <div className="flex justify-between mb-5 text-center">
              <h1 className="text-2xl font-bold ">Connectez-vous à Z</h1>
              <ModeToggle />
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label>username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register('username')}
                ></Input>
              </div>
              <div className="grid gap-1">
                <Label>password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                ></Input>
              </div>
              <Button>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
