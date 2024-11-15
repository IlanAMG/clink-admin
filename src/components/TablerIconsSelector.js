import styled from "styled-components";
import * as rawIcons from "@tabler/icons";
import { useState } from "react";
import { Modale } from "./Modale";

const StyledTablerIconSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .iconPreview {
    height: 80px;
    width: 80px;
    border-radius: 12px;
    border: solid 1px lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 80px;
    color: gray;
    border: 1px solid lightgray;
    background-color: white;
    border-radius: 12px;
    padding: 4px;
  }
`;

const Icons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 72px;
  gap: 12px;
  padding: 12px 0;
  height: 320px;
  min-width: 492px;

  .wrapper-icon {
    width: 72px;
    height: 72px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(180, 180, 180, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const SelectionModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  .searchBar {
    border: 1px solid lightgray;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    svg {
      height: 100%;
      aspect-ratio: 1/1;
    }
    input {
      flex-grow: 1;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }
`;

export function TablerIcon({ name, size, color, stroke }) {
  if (name) {
    const Icon = rawIcons[name];
    return <Icon size={size} color={color} stroke={stroke} />;
  }
  return null;
}

export function TablerIconsSelector({ icon, setIcon, size, color, stroke }) {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getIcons = (search) => {
    return Object.keys(rawIcons).filter((icon) =>
      icon.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      <Modale
        isOpen={selectionModalOpen}
        close={() => setSelectionModalOpen(false)}
        title="Select an icon"
        actions={[
          {
            title: "Clear",
            click: () => {
              setIcon("");
              setSearch("");
              setSelectionModalOpen(false);
            },
          },
        ]}
      >
        <SelectionModalContent>
          <div className="searchBar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="10" cy="10" r="7"></circle>
              <line x1="21" y1="21" x2="15" y2="15"></line>
            </svg>
            <input
              type={"search"}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <Icons>
            {getIcons(search).map((icon) => {
              return (
                <div
                  className="wrapper-icon"
                  onClick={() => {
                    setIcon(icon);
                    setSearch("");
                    setSelectionModalOpen(false);
                  }}
                >
                  <TablerIcon name={icon} size={32} />
                </div>
              );
            })}
          </Icons>
        </SelectionModalContent>
      </Modale>
      <StyledTablerIconSelector>
        <div className={"iconPreview"}>
          <TablerIcon
            name={icon}
            size={size}
            color={color}
            stroke={stroke}
            rawIcons={rawIcons}
          />
        </div>
        <button onClick={() => setSelectionModalOpen(true)}>Select</button>
      </StyledTablerIconSelector>
    </>
  );
}
