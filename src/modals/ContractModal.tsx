import * as React from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import UploadToIpfs from "../components/UploadToIpfs";
import { isNaN } from "../helpers/bignumber";

const SSubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 24px;
  & > button:last-child {
    margin-left: 16px;
  }
  & > button:first-child {
    margin-left: 0;
  }
`;

interface IContractModalProps {
  contract: any;
  onAddItem: (contract: any) => void;
  onRemoveItem: (contract: any) => void;
}

class ContractModal extends React.Component<IContractModalProps, any> {
  public state = {
    id: this.props.contract ? this.props.contract.id : "",
    name: this.props.contract ? this.props.contract.name : "",
    description: this.props.contract ? this.props.contract.description : "",
    price: this.props.contract ? this.props.contract.price : 0,
    image: this.props.contract ? this.props.contract.image : ""
  };

  public updateState = (updatedGroupJson: any) =>
    this.setState({ ...this.state, ...updatedGroupJson });

  public onSubmit = () => {
    const { id, name, description, price, image } = this.state;
    this.props.onAddItem({ id, name, description, price, image });
  };

  public onRemove = () => {
    const { id, name, description, price, image } = this.state;
    this.props.onRemoveItem({ id, name, description, price, image });
  };

  public render() {
    return (
      <React.Fragment>
        <h6>{`Create Contract`}</h6>
        <UploadToIpfs
          size={200}
          label={`Image`}
          image={this.state.image}
          onUpload={(image: string) => this.updateState({ image })}
        />

        <Input
          type="text"
          label="Name"
          placeholder="Espresso"
          value={this.state.name}
          onChange={(e: any) => {
            const name = e.target.value;
            const id = name;
            this.updateState({ name, id });
          }}
        />

        <Input
          type="text"
          label="Description"
          placeholder="Small cup with 1 shot"
          value={this.state.description}
          onChange={(e: any) =>
            this.updateState({
              description: e.target.value
            })
          }
        />

        <Input
          type="text"
          label="Price"
          placeholder="2.50"
          value={`${this.state.price}`}
          onChange={(e: any) => {
            const price = e.target.value;
            if (price && isNaN(price)) {
              return;
            }
            this.updateState({ price });
          }}
        />

        <SSubmitWrapper>
          {this.props.contract ? (
            <React.Fragment>
              <Button color={`red`} onClick={this.onRemove}>{`Delete`}</Button>
              <Button onClick={this.onSubmit}>{`Update`}</Button>
            </React.Fragment>
          ) : (
            <Button onClick={this.onSubmit}>{`Submit`}</Button>
          )}
        </SSubmitWrapper>
      </React.Fragment>
    );
  }
}

export default ContractModal;
