import { IComponentProps } from '../@types/ComponentProps';
import Container from '../components/Container';
import Footer from '../components/Footer';
import { Menu } from '../components/Menu';

const App = ({ children }: IComponentProps) => {
  return (
    <>
      <Menu />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default App;
