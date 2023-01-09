import { MagnifyingGlass } from 'react-loader-spinner';
import { SpinerItem } from './Loader.styled';

export default function Loader() {
  return (
    <SpinerItem>
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </SpinerItem>
  );
}
