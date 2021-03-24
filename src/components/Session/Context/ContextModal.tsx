import { Modal } from 'library';
import Context from '.';
import './index.scss';

const ContextModal = ({ show = false, onClose = () => {} }) => (
  <Modal open={show} onClose={onClose}>
    <Context />
  </Modal>
);

export default ContextModal;
