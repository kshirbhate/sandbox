import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'library';
import './index.scss';

type Props = {
  onFetch?: Function;
  onDelete?: Function;
  onAdd?: Function;
  onClear?: Function;
  onClose?: Function;
};

const ToolbarButton = ({ onClick, children }) => (
  <Button onClick={onClick} color="primary" size="sm">
    {children}
  </Button>
);

const ButtonToolbar: React.FC<Props> = ({ onFetch = undefined, onDelete = undefined, onAdd = undefined, onClear = undefined, onClose = undefined }) => {
  const history = useHistory();
  return (
    <div className="button-toolbar-container">
      {onFetch && <ToolbarButton onClick={onFetch}>Fetch</ToolbarButton>}
      {onDelete && <ToolbarButton onClick={onDelete}>Delete</ToolbarButton>}
      {onAdd && <ToolbarButton onClick={onAdd}>Add</ToolbarButton>}
      {onClear && <ToolbarButton onClick={onClear}>Clear</ToolbarButton>}
      <ToolbarButton onClick={onClose ? onClose : () => history.goBack()}>Close</ToolbarButton>
    </div>
  );
};

export default ButtonToolbar;
