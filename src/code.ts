// This shows the HTML page in "ui.html".
figma.showUI(__html__, { themeColors: true, height: 120, width: 200 });

setTimeout(async () => {
  const instanceName = await figma.clientStorage.getAsync("instanceName");
  figma.ui.postMessage({ instanceName: instanceName || "" });
}, 100);

figma.ui.onmessage = ({
  type,
  instanceName,
}: {
  type: string;
  instanceName: string;
}) => {
  // console.log("type", type);
  // console.log("instanceName", instanceName);

  const selection = figma.currentPage.selection;
  let instances: InstanceNode[] = [];

  if (selection.length >= 1) {
    selection.forEach((s) => {
      if (s.type === "SECTION" || s.type === "FRAME" || s.type === "INSTANCE") {
        instances = [
          ...instances,
          ...s.findAllWithCriteria({ types: ["INSTANCE"] }),
        ];
      }
    });
  } else {
    instances = figma.currentPage.findAllWithCriteria({ types: ["INSTANCE"] });
  }

  const instancesFiltered = instances.filter((n) => n.name === instanceName);

  // console.log("instances found", instancesFiltered.length);

  if (instancesFiltered.length > 0) {
    if (type === "toggle-instances") {
      if (instancesFiltered[0].opacity === 1) {
        type = "hide-instances";
      } else {
        type = "show-instances";
      }
    }

    if (type === "show-instances") {
      instancesFiltered.forEach((e) => (e.opacity = 1));
    } else if (type === "hide-instances") {
      instancesFiltered.forEach((e) => (e.opacity = 0));
    }

    figma.ui.postMessage({ result: { count: instancesFiltered.length, type } });
  } else {
    figma.ui.postMessage({ result: { count: 0 } });
  }

  figma.clientStorage.setAsync("instanceName", instanceName);
};
