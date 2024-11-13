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
import { useNavigate } from "react-router-dom";

const layoutStyle = {
  paddingTop: "30px",
  height: "100svh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  paddingInline: "16px",
  height: 64,
  lineHeight: "64px",
  marginBottom: "30px",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  paddingInline: "16px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const stepsStyle: React.CSSProperties = {
  marginBottom: "60px",
};

const formItemStyles: React.CSSProperties = {
  marginTop: "10px",
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
  const [isSent, setIsSent] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit,
    formState: { errors }, } = useForm<IFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormValues) => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      try {
        if (isSent) return;

        setIsSent(true);
        const response = await fetch(
          "https://d5d36426qbakdipjf3c5.apigw.yandexcloud.net/api/survey",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await response.json();
      } catch (error) {
        console.error("Error:", error);
      }

      messageApi.open({
        type: "success",
        content: "Данные отправлены. Спасибо!",
      });

      navigate("/success");
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
        <Steps
          current={current}
          responsive={false}
          items={steps}
          style={stepsStyle}
        ></Steps>
        <AntForm onFinish={handleSubmit(onSubmit)}>
          {current === 0 && (
            <>
              <Controller
                name="from"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: {value: 20, message: 'Слишком длинное название'} }}
                render={({ field }) => (
                  <AntForm.Item label="Из какого вы города?" required>
                    <Input {...field} style={formItemStyles} />
                  </AntForm.Item>
                )}
              />
                    <p style={{margin: 0, color: 'red'}}>{errors.from?.message}</p>
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
                    <Radio.Group {...field} style={formItemStyles}>
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
                      style={formItemStyles}
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
                rules={{ required: true, maxLength: {value: 30, message: 'Слишком длинное название'} }}
                render={({ field }) => (
                  <AntForm.Item label="Ваш любимый ингредиент пиццы" required>
                    <Input {...field} style={formItemStyles} />
                  </AntForm.Item>
                )}
                />
                <p style={{margin: 0, color: 'red'}}>{errors.pizza?.message}</p>
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
                    <Radio.Group {...field} style={formItemStyles}>
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
                    <Radio.Group {...field} style={formItemStyles}>
                      <Radio value={1}>Windows</Radio>
                      <Radio value={2}>MacBook</Radio>
                    </Radio.Group>
                  </AntForm.Item>
                )}
              />
            </>
          )}
          <div style={{ marginTop: 50 }}>
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
      <Footer style={footerStyle}>by Efremenkov A., 2024</Footer>
    </Layout>
  );
};
