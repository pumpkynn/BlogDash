import { Watermark, Image } from "antd";
import welcome from "../assets/images/welcome.gif";
const Welcome = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Watermark content="公众号：知否技术">
        <h1>欢迎来到知否在线博客论坛</h1>
        <Image width={888} src={welcome} />
      </Watermark>
    </div>
  );
};

export default Welcome;
