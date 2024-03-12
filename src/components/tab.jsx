// import React, { useState } from 'react';

// const Tabs = ({ children  }) => {
//   const [activeTab, setActiveTab] = useState(children[0].props.label);

//   const handleClick = (e, newActiveTab) => {
//     e.preventDefault();
//     setActiveTab(newActiveTab);
  
//   };

//   return (
//     <div className=" mx-auto" style={{width:'100%'}}>
//       <div className="flex border-b border-gray-300">
//         {children.map(child => (
            
//           <button
//             key={child.props.label}
//             className={`${
//               activeTab === child.props.label ? 'border-b-2 border-purple-500' : ''
//             } flex-1 text-gray-700 font-medium py-2`}
//             onClick={e => handleClick(e, child.props.label)}
//           >
           
//                {child.props.label}
          
//           </button>
//         ))}
//       </div>
//       <div className="py-4">
//         {children.map(child => {
//           if (child.props.label === activeTab) {
//             return <div key={child.props.label} >{child.props.children}</div>;
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// const Tab = ({ label, children ,onClick }) => {
//     console.log(children,'children')
//   return (
//    <>
//      {onClick?( 
//     <div label={label} className="hidden" onClick={onClick}>
//       {children}
//    </div>):(
//     <div label={label} className="hidden" >
//     {children} 
//   </div>
//  )}
//    </>
//   );
// };
// export { Tabs, Tab };

import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab, func, p) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
    func(p);
  };

  return (
    <div className=" mx-auto" style={{ width: '100%' }}>
      <div className="flex border-b border-gray-300">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-purple-500' : ''
            } flex-1 text-gray-700 font-medium py-2`}
            onClick={e => handleClick(e, child.props.label, child.props.func, child.props.p)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children, onClick, func, p }) => {
  return (
    <>
      {onClick ? (
        <div label={label} className="hidden" onClick={onClick}>
          {children}
        </div>
      ) : (
        <div label={label} className="hidden">
          {children}
        </div>
      )}
    </>
  );
};

export { Tabs, Tab };
