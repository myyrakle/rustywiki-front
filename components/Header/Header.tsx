import * as React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import {
  Button,
  Divider,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  useTheme,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchBar from '../SearchBar';
import { ROUTES } from '../../libs/const/routes';
import { useDarkMode } from '../../hooks/useDarkMode';
import useAccess from '../../hooks/useAccess';
import useApi from '../../hooks/useApi';
import { useRouter } from 'next/router';
import { STORAGE_KEY } from '../../libs/const/storageKey';

const Header: React.FunctionComponent<any> = () => {
  const theme = useTheme();
  const { mode, setMode } = useDarkMode();
  const { user } = useAccess();
  const api = useApi();
  const router = useRouter();

  /** 로그인 메뉴 관련 */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
          background-color: ${mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.primary.main};
        `}
      >
        <nav
          css={css`
            max-width: 1300px;
            display: flex;
            justify-content: space-between;
            padding: 0 16px;
            width: 100%;
            height: 42px;
            color: white;
          `}
        >
          <Grid container alignItems="center" style={{ flexShrink: 1 }}>
            <Link href={{ pathname: ROUTES.MAIN }} passHref>
              <a
                css={css`
                  color: white;
                  &:active,
                  &:link,
                  &:visited {
                    color: white;
                  }
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                `}
              >
                Logo
              </a>
            </Link>
          </Grid>
          <Hidden only={['xs']}>
            <SearchBar />
          </Hidden>
          <Grid
            container
            alignItems="center"
            justify="flex-end"
            style={{ flex: '0 0' }}
          >
            <Button
              css={css`
                color: white;
                min-width: 40px;
              `}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <PersonIcon fontSize="small" />
            </Button>
          </Grid>
        </nav>

        <Menu
          id="simple-menu"
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}
          open={open}
          PaperProps={{
            style: { width: 160 },
          }}
        >
          <MenuItem>설정</MenuItem>
          <MenuItem
            onClick={() => {
              mode === 'dark' ? setMode('light') : setMode('dark');
            }}
          >
            {mode === 'dark' ? '라이트 테마로' : '다크 테마로'}
          </MenuItem>
          <Divider orientation="horizontal" />
          <MenuItem>내 문서 기여 목록</MenuItem>
          <MenuItem>내 토론 기여 목록</MenuItem>
          <Divider orientation="horizontal" />
          {user.auth ? (
            <MenuItem
              onClick={async () => {
                const token =
                  localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN) ?? '';
                await api.auth.logout(token);
                localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
                router.reload();
              }}
            >
              로그아웃
            </MenuItem>
          ) : (
            <Link href={ROUTES.LOGIN}>
              <MenuItem>로그인</MenuItem>
            </Link>
          )}
        </Menu>
      </div>
      <Hidden xsDown={false} smUp>
        <SearchBar />
      </Hidden>
    </>
  );
};

export default Header;
