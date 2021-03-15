import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from './Menu';
import { CustomDropdown } from 'library';
import { logout } from 'components/Session/Login/actions';

const ContextRight = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClick = (value) => {
    switch (value) {
      case 'home':
      case 'Help': {
        history.push('/home');
        return;
      }
      case 'Logout': {
        dispatch(logout());
        history.push('/');
        return;
      }
      default: {
        history.push('/home');
        return;
      }
    }
  };

  return (
    <div className="context-menus">
      <Menu label="Home" onClick={() => onClick('home')} />
      <CustomDropdown
        buttonText="User Name"
        buttonProps={{
          color: 'transparent',
        }}
        dropdownList={['Help', 'Logout']}
        onClick={onClick}
      />
    </div>
  );
};

export default ContextRight;
