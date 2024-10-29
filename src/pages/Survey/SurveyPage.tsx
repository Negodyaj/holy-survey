import {
  Steps,
  Button,
  Form as AntForm,
  Input,
  Layout,
  Radio,
  Slider,
  SliderSingleProps,
  message,
} from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const layoutStyle = {
  // borderRadius: 8,
  // overflow: "hidden",
  // width: "calc(50% - 8px)",
  // maxWidth: "calc(50% - 8px)",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  paddingInline: "16px",
  //color: "#fff",
  height: 64,
  lineHeight: "64px",
  //backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  paddingInline: "16px",
  //color: "#fff",
  // backgroundColor: "#0958d9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

interface IFormValues {
  from: string;
  pizza: string;
  loveTravel: boolean;
  weather: number;
  phone: number;
  os: number;
}

export const SurveyPage = () => {
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit } = useForm<IFormValues>();

  const onSubmit = (data: unknown) => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      console.log("Данные формы", data);
      messageApi.open({
        type: "success",
        content: "Данные отправлены. Спасибо!",
      });
      // Здесь можно отправить данные на сервер или сделать что-то еще
    }
  };

  const marks: SliderSingleProps["marks"] = {
    0: "Hate",
    10: "Love",
  };

  const steps = [{}, {}, {}, {}, {}, {}];

  return (
    <Layout style={layoutStyle}>
      <h1 style={headerStyle}>Not so boring survey 🙃 </h1>
      <Content style={contentStyle} id="survey">
        {contextHolder}
        <Steps current={current} responsive={false} items={steps}></Steps>
        <AntForm onFinish={handleSubmit(onSubmit)}>
          {current === 0 && (
            <>
              <Controller
                name="from"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <AntForm.Item label="Из какого вы города?" required>
                    <Input {...field} />
                  </AntForm.Item>
                )}
              />
            </>
          )}
          {current === 1 && (
            <>
              <Controller
                name="loveTravel"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <AntForm.Item label="А путешествовать любите?" required>
                    <Radio.Group {...field}>
                      <Radio value={true}>Да</Radio>
                      <Radio value={false}>Нет</Radio>
                    </Radio.Group>
                  </AntForm.Item>
                )}
              />
            </>
          )}
          {current === 2 && (
            <>
              <Controller
                name="weather"
                control={control}
                defaultValue={5}
                rules={{ required: true }}
                render={({ field }) => (
                  <AntForm.Item label="Как вам Питер в ноябре?" required>
                    <Slider
                      range={false}
                      min={0}
                      max={10}
                      marks={marks}
                      {...field}
                    />
                  </AntForm.Item>
                )}
              />
            </>
          )}
          {current === 3 && (
            <>
              <Controller
                name="pizza"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <AntForm.Item label="Ваш любимый ингредиент пиццы" required>
                    <Input {...field} />
                  </AntForm.Item>
                )}
              />
            </>
          )}
          {current === 4 && (
            <>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AntForm.Item label="Android vs iPhone?" required>
                    <Radio.Group {...field}>
                      <Radio value={1}>Android</Radio>
                      <Radio value={2}>iPhone</Radio>
                    </Radio.Group>
                  </AntForm.Item>
                )}
              />
            </>
          )}
          {current === 5 && (
            <>
              <Controller
                name="os"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AntForm.Item label="Windows vs MacBook?" required>
                    <Radio.Group {...field}>
                      <Radio value={1}>Windows</Radio>
                      <Radio value={2}>MacBook</Radio>
                    </Radio.Group>
                  </AntForm.Item>
                )}
              />
            </>
          )}
          <div style={{ marginTop: 24 }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
            >
              Назад
            </Button>
            <Button type="primary" htmlType="submit">
              {current < steps.length - 1 ? "Далее" : "Готово"}
            </Button>
          </div>
        </AntForm>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};
