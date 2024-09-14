import { IComponentProps } from '../@types/ComponentProps';
import Container from '../components/Container';
import Footer from '../components/Footer';
import { Menu } from '../components/menu';

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
