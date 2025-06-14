import { Mode } from "../../stores/useScreenStore";
import styled from "styled-components";

interface DefaultCardBodyProps {
  mode: Mode;
  idx: number;
  formattedDate: string;
  title: string;
  description: string;
}

const DefaultCardBody = ({
  description,
  formattedDate,
  idx,
  mode,
  title,
}: DefaultCardBodyProps) => {
  return (
    <Container>
      <div className="meta">
        <h6 className="index">{mode !== "mobile" ? idx + 1 : idx}</h6>
        <p className="updated_at">{formattedDate}</p>
      </div>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
    </Container>
  );
};

export default DefaultCardBody;

const Container = styled.div`
  height: 60%;
  overflow: scroll;
  word-break: keep-all;
  padding: 0.5rem;
  .title {
    font-weight: bold;
  }
`;
