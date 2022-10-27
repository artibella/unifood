const checkDate = ({component}) => {
  const startDate = new Date(component.parameters?.startDate.value);
  const endDate = new Date(component.parameters?.endDate.value);
  const now = new Date();
  const shouldRender = now > startDate && now < endDate;
  return shouldRender;
}

export default function scheduledContentEnhancer (component) {
  return component
    .data('shouldRender', checkDate)
}