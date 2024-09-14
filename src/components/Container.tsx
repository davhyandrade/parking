import { IComponentProps } from "../@types/ComponentProps";

const Container = ({ children }: IComponentProps) => {
  return (
    <main id="global-container">
      {children}
    </main>
  )
}

export default Container;