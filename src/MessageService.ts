export const postMessageToggle = (instanceName: string) => {
  parent.postMessage(
    { pluginMessage: { type: "toggle-instances", instanceName } },
    "*"
  );
};

export const postMessageShow = (instanceName: string) => {
  parent.postMessage(
    { pluginMessage: { type: "show-instances", instanceName } },
    "*"
  );
};

export const postMessageHide = (instanceName: string) => {
  parent.postMessage(
    { pluginMessage: { type: "hide-instances", instanceName } },
    "*"
  );
};
