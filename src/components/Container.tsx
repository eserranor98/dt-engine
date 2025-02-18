// /**
//  * Component responsible for rendering and measuring the content.
//  * Updates the engine store with the content's size.
//  */

// import { useRef } from "react";
// import { useEngineStore } from "../engine/useEngineStore";
// import { ContentSpring, useGestureBindings } from "../hooks/useGestureBindings";
// import { useRectObserver } from "../hooks/useRectObserver";

// type IProps = {
//   children: React.ReactNode;
//   contentSpring: ContentSpring;
// };

// export const Container = ({ children, contentSpring }: IProps) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const setContainerRect = useEngineStore((s) => s.setContainerRect);

//   const bindings = useGestureBindings({ contentSpring });

//   /**
//    * We use the useRectObserver hook to observe the container's size
//    * and store it in the engine store.
//    */
//   useRectObserver({ ref, setRect: setContainerRect });

//   return (
//     <div
//       ref={ref}
//       {...bindings}
//       className="bg-zinc-200 grow relative overflow-hidden touch-none"
//     >
//       {children}
//     </div>
//   );
// };
