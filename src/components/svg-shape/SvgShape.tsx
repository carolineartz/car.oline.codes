import * as React from 'react';

interface ISvgShapeProps {
  viewBox: string;
  name: string;
}

interface SVGUseElementWithData extends SVGUseElement {
  'data-name': string;
}

interface SvgUseElementWithDataProps extends React.SVGProps<SVGUseElementWithData> {
  dataName: string;
}

export const SvgShape = ({ viewBox = '0 0 142 142', name }: ISvgShapeProps) => {
  // doing this because typescript catches non-standard atts defined as React.SVGProps on HTML or SVG Element subinterfaces.
  // Doing this allows me to type check the values against the valid svg element attributes
  // and only the ones I added with SvgUseElementWithDataProps. Since TS does static checking but not dynamic, I could do this by
  // defining the shape in the type definition, but i think its clearer to separate it out.
  const useProps: SvgUseElementWithDataProps = {
    xlinkHref: `#${name}`,
    dataName: name,
  };

  return (
    <svg
      className={name}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <use {...useProps}></use>
    </svg>
  );
};
