import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import { CustomDropdown } from 'library';
import { logout } from 'components/Session/Login/actions';
import { IRootState } from 'reducers';
import { isEmpty, isNil } from 'lodash';

const ContextRight = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const session: any = useSelector((state: IRootState) => state.session.session);
  const cnnctnString = session?.dbpTrnsctnDtbse.cnnctnString;

  const onClick = (value) => {
    switch (value) {
      case 'home':
      case 'Help': {
        history.push('/menu');
        return;
      }
      case 'Logout': {
        dispatch(logout());
        history.push('/');
        return;
      }
      default: {
        history.push('/menu');
        return;
      }
    }
  };

  return (
    <div className="context-menus">
      {!isEmpty(cnnctnString) && !isNil(cnnctnString) && <Menu label="Home" onClick={() => onClick('home')} />}
      <CustomDropdown
        buttonText={session?.crrntApplctnUser?.realName}
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
