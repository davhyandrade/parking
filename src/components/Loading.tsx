import { useEffect, useState } from 'react';
import SpinnerIcon from '../assets/icons/SpinnerIcon';

interface ILoadingProps {
  name?: string;
}

const Loading = ({ name }: ILoadingProps) => {
  const [verifiedName, setVerifiedName] = useState<string | undefined>(name);

  const checkLoadingName = (name: string) => {
    let startIndex = name.length - 3;
    let endIndex = name.length;

    if (name.substring(startIndex, endIndex) === '...') return;

    setVerifiedName(name.concat('...'));
  };

  useEffect(() => {
    if (name) checkLoadingName(name);
  }, []);

  return (
    <div id="loading-field">
      <div>
        <SpinnerIcon />
        {name && <span>{verifiedName}</span>}
      </div>
    </div>
  );
};

export default Loading;
