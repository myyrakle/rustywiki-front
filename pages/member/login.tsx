import { css } from '@emotion/react';
import { Button, FormControl, TextField } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import DefaultLayout from '../../components/DefaultLayout';
import NormalPageContainer from '../../components/NormalPageContainer';
import { userState } from '../../hooks/useAccess';
import useApi from '../../hooks/useApi';
import { ROUTES } from '../../libs/const/routes';
import { STORAGE_KEY } from '../../libs/const/storageKey';

type LoginFormType = {
  id: string;
  password: string;
};

const LoginPage = (): JSX.Element => {
  const { handleSubmit, setError, control } = useForm<LoginFormType>();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const api = useApi();

  const onSubmit = React.useCallback(
    async (v) => {
      try {
        setLoading(true);
        const loginRes = await api.auth.login(v.id, v.password);
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, loginRes.refresh_token);
        const data = await api.user.getMyInfo();
        setUser({
          auth: true,
          email: data?.email,
          nickname: data?.nickname,
        });

        enqueueSnackbar('로그인에 성공했습니다', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        });
      } catch (error) {
        setError('password', {
          message: '아이디와 패스워드가 일치하지 않습니다.',
        });
      } finally {
        setLoading(false);
      }
    },
    [router.query?.redirect]
  );

  React.useEffect(() => {
    if (user.auth) {
      const redirect = router.query?.redirect;
      if (Array.isArray(redirect)) {
        router.replace(redirect?.[0] ?? ROUTES.MAIN);
        return;
      }
      router.replace(redirect ?? ROUTES.MAIN);
    }
  }, [user]);

  return (
    <DefaultLayout>
      <NormalPageContainer title="로그인">
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <form
            css={css`
              max-width: 400px;
              width: 100%;
            `}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth>
              <Controller
                name="id"
                control={control}
                rules={{ required: '아이디를 입력해주세요.' }}
                render={(p) => {
                  return (
                    <TextField
                      autoFocus
                      fullWidth
                      id="id-field"
                      name="id"
                      label="ID"
                      variant="outlined"
                      inputRef={p.field.ref}
                      onBlur={p.field.onBlur}
                      onChange={p.field.onChange}
                      error={p.fieldState.invalid}
                      helperText={p.fieldState.error?.message}
                    />
                  );
                }}
              />
            </FormControl>
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <FormControl fullWidth>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: '패스워드를 입력해주세요.' }}
                  render={(p) => (
                    <TextField
                      fullWidth
                      id="password-field"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      inputRef={p.field.ref}
                      onBlur={p.field.onBlur}
                      onChange={p.field.onChange}
                      error={p.fieldState.invalid}
                      helperText={p.fieldState.error?.message}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8px;
              `}
            >
              <Link href={ROUTES.FIND_PASSWORD}>[아이디/비밀번호 찾기]</Link>
              <div
                css={css`
                  display: flex;
                  justify-content: flex-end;
                  > * + * {
                    margin-left: 5px;
                  }
                `}
              >
                <Link href={ROUTES.SIGN_UP}>
                  <Button size="small">회원가입</Button>
                </Link>
                <Button
                  disabled={loading}
                  size="small"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  로그인
                </Button>
              </div>
            </div>
          </form>
        </div>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export default LoginPage;
