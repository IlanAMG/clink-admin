import React, { useCallback, useEffect, useState } from "react";
import { Modale } from "../Modale";
import CsvDownloader from "react-csv-downloader";
import { generateLinksAction } from "../../modules/links";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { whitelabelListSelector } from "../../store/Whitelabel/WhitelabelList";
import { useSelector } from "react-redux";
import { getProductsByWhitelabel } from "../../modules/whitelabels";
import { WhitelabelSelection } from "../WhitelabelSelection";

export const ModaleGenerateLink = ({ close, refetch, ...props }) => {
  const { whiteLabelNameList } = useSelector(whitelabelListSelector);
  const [products, setProducts] = useState([]);
  const [nbValue, setNbValue] = useState(1);
  const [whitelabel, setWhitelabel] = useState("");
  const [product, setProduct] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [result, setResult] = useState(false);

  const hasGenerateAction = () => {
    close();
    refetch();
  };
  const whitelabelList = () => {
    const copyWhitelabelList = [...whiteLabelNameList];
    copyWhitelabelList?.shift();
    return copyWhitelabelList ?? [];
  };
  const generate = async () => {
    if (!whitelabel || nbValue <= 0) {
      alert("Veuillez remplir tous les champs.");
      return [];
    } else {
      setLoadingGenerate(true);
      try {
        const res = await generateLinksAction({ nbValue, whitelabel, product });
        setResult(true);
        setLoadingGenerate(false);
        return res.data;
      } catch (err) {
        setLoadingGenerate(false);
        alert(err?.message || "Error");
        return [];
      }
    }
  };

  const columns = [{ id: "url", displayName: "URL" }];

  const getAllProducts = useCallback(async () => {
    const stickersRes = await getProductsByWhitelabel(whitelabel, "sticker");
    const cardsRes = await getProductsByWhitelabel(whitelabel, "card");
    const stickers = stickersRes?.data?.products ?? [];
    const cards = cardsRes?.data?.products ?? [];
    return [...stickers, ...cards].filter((product) => !product.disable);
  }, [whitelabel]);

  useEffect(() => {
    setProduct("");
    if (whitelabel) {
      setLoadingProduct(true);
      getAllProducts()
        .then((data) => {
          setLoadingProduct(false);
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
          setLoadingProduct(false);
        });
    } else {
      setLoadingProduct(false);
      setProducts([]);
    }
  }, [whitelabel, getAllProducts]);

  useEffect(() => {
    if (result) {
      hasGenerateAction();
    }
  }, [result]);

  return (
    <Modale
      title="Génération de liens"
      close={close}
      actions={[
        {
          custom: (
            <CsvDownloader
              style={{
                backgroundColor: "#5FD4D0",
                color: "#FFF",
                border: "none",
                padding: "6px 12px",
                width: "108px",
                borderRadius: "6px",
                opacity: loadingGenerate ? 0.4 : 1,
              }}
              filename="generatedLinks"
              extension=".csv"
              columns={columns}
              datas={generate}
              text={loadingGenerate ? "Wait..." : "GENERATE"}
              disabled={loadingGenerate}
            />
          ),
        },
      ]}
      {...props}
    >
      <FormControl
        fullWidth
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="number">Nombre</InputLabel>
        <OutlinedInput
          id="number"
          type="number"
          value={nbValue}
          onChange={(e) => setNbValue(e.target.value)}
          labelWidth={70}
        />
      </FormControl>
      <FormControl
        fullWidth
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
        variant="outlined"
      >
        <WhitelabelSelection
          value={whitelabel}
          onChange={(newValue) => setWhitelabel(newValue)}
        />
      </FormControl>
      {products.length ? (
        <FormControl
          fullWidth
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
          variant="outlined"
        >
          <InputLabel id="products-simple-select">Products</InputLabel>
          <Select
            labelId="products-select"
            id="whitelabels-simple-select"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            MenuProps={{ PaperProps: { sx: { maxHeight: 140 } } }}
          >
            {products.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        loadingProduct && <span>Chargement des produits...</span>
      )}
    </Modale>
  );
};
