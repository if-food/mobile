declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
