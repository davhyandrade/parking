import DoneIcon from '../assets/icons/DoneIcon';

interface IWarningOfDoneProps {
  name?: string;
}

const WarningOfDone = ({ name }: IWarningOfDoneProps) => {
  return (
    <div id="warning-of-done">
      <div>
        <DoneIcon />
        {name && <span>{name.toUpperCase()}</span>}
      </div>
    </div>
  );
};

export default WarningOfDone;
