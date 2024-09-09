import React from "react";

function Section({ data }: { data: { title: string; content: string[] }[] }) {
  return (
    <div className="section-items">
      {data.map((item, i) => (
        <div className="section" key={"dsa-" + i}>
          <h2 className="advent">{item.title}</h2>
          {item.content.map((content, i) => (
            <p key={"dbas-" + i}>{content}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Section;
