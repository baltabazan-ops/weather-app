const Container = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div {...props}> {props.children}</div>
);

export default Container;
