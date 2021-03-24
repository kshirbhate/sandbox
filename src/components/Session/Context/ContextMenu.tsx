import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import { IRootState } from 'reducers';
import './index.scss';
import { isEmpty, isNil } from 'lodash';
import ContextModal from './ContextModal';
import { setShowContextModal } from './actions';
import { setShowMenuModal } from 'components/Menu/actions';
import { CONTEXT_MODAL, getMultiHandleKeys, KEY_HANDLERS, MENU_MODAL } from 'constants/keyHandlers';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import SearchMenuModal from 'components/Menu/SearchMenuModal';

const ContextMenu = () => {
  const dispatch = useDispatch();
  const showContextModal = useSelector((state: IRootState) => state.context.showContextModal);
  const showMenuModal = useSelector((state: IRootState) => state.menu.showMenuModal);
  const session: any = useSelector((state: IRootState) => state.session.session);
  const cnnctnString = session?.dbpTrnsctnDtbse.cnnctnString;
  if (isEmpty(cnnctnString) || isNil(cnnctnString)) {
    return null;
  }

  const onClick = () => {
    dispatch(setShowContextModal(true));
  };

  const onClose = () => {
    dispatch(setShowContextModal(false));
  };

  const openMenuModal = () => {
    dispatch(setShowMenuModal(true));
  };

  const onCloseMenuModal = () => {
    dispatch(setShowMenuModal(false));
  };

  const onKeyEvent = (key, e) => {
    e.preventDefault();
    if (key === KEY_HANDLERS.CONTEXT_MODAL.open_modal) {
      onClick();
    } else if (key === KEY_HANDLERS.MENU_MODAL.open_modal) {
      openMenuModal();
    }
  };

  const handleKeys = getMultiHandleKeys([CONTEXT_MODAL, MENU_MODAL]);

  return (
    <div className="context-menus">
      <Menu label={session?.crrntCmpny?.title} onClick={onClick} />
      <Menu label={session?.crrntCmpnyRegion?.title} onClick={onClick} />
      <Menu label={session?.crrntCmpnyBranch?.title} onClick={onClick} />
      <Menu label={session?.crrntCmpnyUnit?.title} onClick={onClick} />
      <Menu label={session?.crrntFnnclYear?.title} onClick={onClick} />
      {showContextModal && <ContextModal show={showContextModal} onClose={onClose} />}
      {showMenuModal && <SearchMenuModal show={showMenuModal} onClose={onCloseMenuModal} />}

      <KeyboardEventHandler handleKeys={handleKeys} onKeyEvent={onKeyEvent} />
    </div>
  );
};

export default ContextMenu;
