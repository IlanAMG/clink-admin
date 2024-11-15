import { Button } from "@mui/material";
import styled from "styled-components";
import { CheckBox } from "../../../../../components/CheckBox";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../../components/ModalWhiteLabel/ModalWhiteLabelStyle";

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const LayoutSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  * {
    padding: 0;
    margin: 0;
  }
  select {
    border: none;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  padding-left: 8px;
  justify-content: space-between;
`;

const OptionTab = ({
  selectedWhiteLabel,
  setSelectedWhiteLabel,
  onUpdateWhitelabel,
}) => {
  const navigate = useNavigate();
  const handleCheck = (target, reverse) => {
    const { checked, name } = target;
    setSelectedWhiteLabel({
      ...selectedWhiteLabel,
      [name]: reverse ? !checked : checked,
    });
  };

  return (
    <>
      <CheckBox
        title="Activer le sponsor whitelabel"
        id="sponsorEnabled"
        checked={selectedWhiteLabel.sponsorEnabled}
        onChange={(e) => handleCheck(e.target)}
        name="sponsorEnabled"
      />
      <CheckBox
        title="Activer le Sticker Custom"
        id="certifier"
        checked={selectedWhiteLabel.hasCustomStickers}
        onChange={(e) => handleCheck(e.target)}
        name="hasCustomStickers"
      />
      <CheckBox
        title="Activer le Custom Card"
        id="customCard"
        checked={selectedWhiteLabel.hasCustomCards}
        onChange={(e) => handleCheck(e.target)}
        name="hasCustomCards"
      />
      <CheckBox
        title="Activer le shop"
        id="shopDisabled"
        checked={!selectedWhiteLabel.shopDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="shopDisabled"
      />
      <CheckBox
        title="Activer les plans"
        id="plansDisabled"
        checked={!selectedWhiteLabel.plansDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="plansDisabled"
      />
      <CheckBox
        title="Activer le champ code"
        id="codeEnabled"
        checked={selectedWhiteLabel.codeEnabled}
        onChange={(e) => handleCheck(e.target)}
        name="codeEnabled"
      />
      <CheckBox
        title="Activer le programme de fidélité"
        id="programFidelityEnabled"
        checked={selectedWhiteLabel.programFidelityEnabled}
        onChange={(e) => handleCheck(e.target)}
        name="programFidelityEnabled"
      />
      <CheckBox
        title="Activer la campagne"
        id="campaign"
        checked={selectedWhiteLabel.campaign}
        onChange={(e) => handleCheck(e.target)}
        name="campaign"
      />
      {selectedWhiteLabel.campaign && (
        <LayoutSelect>
          <p>Layout</p>
          <select
            value={selectedWhiteLabel.layout}
            onChange={(e) => {
              setSelectedWhiteLabel({
                ...selectedWhiteLabel,
                layout: e.target.value,
              });
            }}
          >
            <option value="SPLIT">Split</option>
            <option value="BANNER">Banner</option>
            <option value="VIDEO">Video</option>
          </select>
        </LayoutSelect>
      )}
      <CheckBox
        title="Activate social network"
        id="networkDisabled"
        checked={!selectedWhiteLabel.networkDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="networkDisabled"
      />
      {!selectedWhiteLabel.networkDisabled && (
        <HorizontalContainer>
          Storyly web token
          <Input
            type="text"
            id="web"
            placeholder="Enter a token"
            value={selectedWhiteLabel.storyly_tokens?.web || ""}
            onChange={(e) =>
              setSelectedWhiteLabel({
                ...selectedWhiteLabel,
                storyly_tokens: selectedWhiteLabel.storyly_tokens
                  ? {
                      ...selectedWhiteLabel.storyly_tokens,
                      web: e.target.value,
                    }
                  : { web: e.target.value, ios: "", android: "" },
              })
            }
            name="web"
          />
        </HorizontalContainer>
      )}
      {!selectedWhiteLabel.networkDisabled && (
        <HorizontalContainer>
          Storyly ios token
          <Input
            type="text"
            id="ios"
            placeholder="Enter a token"
            value={selectedWhiteLabel.storyly_tokens?.ios || ""}
            onChange={(e) =>
              setSelectedWhiteLabel({
                ...selectedWhiteLabel,
                storyly_tokens: selectedWhiteLabel.storyly_tokens
                  ? {
                      ...selectedWhiteLabel.storyly_tokens,
                      ios: e.target.value,
                    }
                  : { web: "", ios: e.target.value, android: "" },
              })
            }
            name="ios"
          />
        </HorizontalContainer>
      )}
      {!selectedWhiteLabel.networkDisabled && (
        <HorizontalContainer>
          Storyly android token
          <Input
            type="text"
            id="android"
            placeholder="Enter a token"
            value={selectedWhiteLabel.storyly_tokens?.android || ""}
            onChange={(e) =>
              setSelectedWhiteLabel({
                ...selectedWhiteLabel,
                storyly_tokens: selectedWhiteLabel.storyly_tokens
                  ? {
                      ...selectedWhiteLabel.storyly_tokens,
                      android: e.target.value,
                    }
                  : { web: "", ios: "", android: e.target.value },
              })
            }
            name="android"
          />
        </HorizontalContainer>
      )}
      <CheckBox
        title="Activate statistics"
        id="analyticsDisabled"
        checked={!selectedWhiteLabel.analyticsDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="analyticsDisabled"
      />
      <CheckBox
        title="Activate benefits"
        id="benefitsDisabled"
        checked={!selectedWhiteLabel.benefitsDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="benefitsDisabled"
      />
      <CheckBox
        title="Activate affiliate page"
        id="affiliateDisabled"
        checked={!selectedWhiteLabel.affiliateDisabled}
        onChange={(e) => handleCheck(e.target, true)}
        name="affiliateDisabled"
      />
      <CheckBox
        title="Activate custom domain"
        id="customDomainEnabled"
        checked={selectedWhiteLabel.customDomainEnabled}
        onChange={(e) => handleCheck(e.target)}
        name="customDomainEnabled"
      />
      <CheckBox
        title="Activate home page"
        id="homeEnabled"
        checked={selectedWhiteLabel.homeEnabled}
        onChange={(e) => handleCheck(e.target)}
        name="homeEnabled"
      />
      <Buttons>
        <Button onClick={() => navigate("/dashboard/whitelabels")}>Back</Button>
        <Button onClick={() => onUpdateWhitelabel()}>Save</Button>
      </Buttons>
    </>
  );
};

export default OptionTab;
