import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { Text, Input, Button, Flex } from "figma-kit";
import "./ui.css";
import {
  postMessageHide,
  postMessageShow,
  postMessageToggle,
} from "./MessageService";

function App() {
  const [instanceName, setInstanceName] = useState("");
  const [result, setResult] = useState<
    undefined | { count: number; type?: string }
  >();

  const onClickShow = () => {
    postMessageShow(instanceName);
  };

  const onClickHide = () => {
    postMessageHide(instanceName);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postMessageToggle(instanceName);
  };

  useEffect(() => {
    const messageListener = (e) => {
      if (e.data.pluginMessage.instanceName) {
        setInstanceName(e.data.pluginMessage.instanceName || "");
      }
      if (e.data.pluginMessage.result) {
        setResult(e.data.pluginMessage.result);
      }
    };
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  return (
    <main>
      <section>
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <Flex gap="2">
              <Input
                placeholder="Instance name"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                autoFocus
              />
              <Button variant="primary">Toggle</Button>
            </Flex>
            <Flex gap="2" justify="center">
              <Button onClick={onClickShow} type="button">
                Show
              </Button>
              <Button onClick={onClickHide} type="button">
                Hide
              </Button>
            </Flex>
            {result && result.count > 0 && (
              <Text align="center">
                Instances{" "}
                {result.type === "show-instances" ? "shown" : "hidden"}:{" "}
                {result.count}
              </Text>
            )}
            {result && result.count === 0 && (
              <Text align="center">No instances found</Text>
            )}
          </Flex>
        </form>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
