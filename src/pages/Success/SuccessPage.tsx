import { Flex, Layout } from "antd";
import icon from "./hlopushka.png";
import React from "react";

const layoutStyle = {
  height: "100svh",
};

export const SuccessPage = () => {
  return (
    <Layout style={layoutStyle}>
      <Flex
        justify="center"
        align="center"
        style={{ flexDirection: "column", height: "100%" }}
      >
        <img src={icon} alt="" width={"80%"} />
        <h2>Success!</h2>
      </Flex>
    </Layout>
  );
};
