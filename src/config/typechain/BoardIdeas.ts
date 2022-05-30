/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface BoardIdeasInterface extends utils.Interface {
  functions: {
    "ACCESS_PASS()": FunctionFragment;
    "ACCESS_PASS_PRICE()": FunctionFragment;
    "URI()": FunctionFragment;
    "burnAccessPass()": FunctionFragment;
    "commentOnIdea(string,uint64)": FunctionFragment;
    "comments(uint64,uint256)": FunctionFragment;
    "createIdea(string,string)": FunctionFragment;
    "hasAccessPass(address)": FunctionFragment;
    "ideas(uint64)": FunctionFragment;
    "mintAccessPass()": FunctionFragment;
    "totalIdeas()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferAccessPass(address)": FunctionFragment;
    "voteOnIdea(uint8,uint64)": FunctionFragment;
    "votes(uint64,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ACCESS_PASS"
      | "ACCESS_PASS_PRICE"
      | "URI"
      | "burnAccessPass"
      | "commentOnIdea"
      | "comments"
      | "createIdea"
      | "hasAccessPass"
      | "ideas"
      | "mintAccessPass"
      | "totalIdeas"
      | "totalSupply"
      | "transferAccessPass"
      | "voteOnIdea"
      | "votes"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ACCESS_PASS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ACCESS_PASS_PRICE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "URI", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "burnAccessPass",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "commentOnIdea",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "comments",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createIdea",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAccessPass",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "ideas", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "mintAccessPass",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalIdeas",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferAccessPass",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "voteOnIdea",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "votes",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "ACCESS_PASS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ACCESS_PASS_PRICE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "URI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnAccessPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentOnIdea",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "comments", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createIdea", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasAccessPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ideas", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintAccessPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalIdeas", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAccessPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "voteOnIdea", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;

  events: {
    "IdeaCreated(uint64)": EventFragment;
    "IdeaVotesUpdated(uint64,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "IdeaCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "IdeaVotesUpdated"): EventFragment;
}

export interface IdeaCreatedEventObject {
  _ideaId: BigNumber;
}
export type IdeaCreatedEvent = TypedEvent<[BigNumber], IdeaCreatedEventObject>;

export type IdeaCreatedEventFilter = TypedEventFilter<IdeaCreatedEvent>;

export interface IdeaVotesUpdatedEventObject {
  _voteId: BigNumber;
  _voteType: number;
}
export type IdeaVotesUpdatedEvent = TypedEvent<
  [BigNumber, number],
  IdeaVotesUpdatedEventObject
>;

export type IdeaVotesUpdatedEventFilter =
  TypedEventFilter<IdeaVotesUpdatedEvent>;

export interface BoardIdeas extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BoardIdeasInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ACCESS_PASS(overrides?: CallOverrides): Promise<[number]>;

    ACCESS_PASS_PRICE(overrides?: CallOverrides): Promise<[number]>;

    URI(overrides?: CallOverrides): Promise<[string]>;

    burnAccessPass(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commentOnIdea(
      _text: string,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    comments(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        text: string;
        createdBy: string;
        createdAt: BigNumber;
      }
    >;

    createIdea(
      _title: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasAccessPass(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    ideas(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string, string] & {
        id: BigNumber;
        title: string;
        upvotes: BigNumber;
        downvotes: BigNumber;
        createdAt: BigNumber;
        createdBy: string;
        description: string;
      }
    >;

    mintAccessPass(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalIdeas(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[number]>;

    transferAccessPass(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    voteOnIdea(
      _voteType: BigNumberish,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    votes(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[string, number] & { voter: string; voteType: number }>;
  };

  ACCESS_PASS(overrides?: CallOverrides): Promise<number>;

  ACCESS_PASS_PRICE(overrides?: CallOverrides): Promise<number>;

  URI(overrides?: CallOverrides): Promise<string>;

  burnAccessPass(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commentOnIdea(
    _text: string,
    _ideaId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  comments(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber] & {
      text: string;
      createdBy: string;
      createdAt: BigNumber;
    }
  >;

  createIdea(
    _title: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasAccessPass(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  ideas(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber, BigNumber, string, string] & {
      id: BigNumber;
      title: string;
      upvotes: BigNumber;
      downvotes: BigNumber;
      createdAt: BigNumber;
      createdBy: string;
      description: string;
    }
  >;

  mintAccessPass(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalIdeas(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<number>;

  transferAccessPass(
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  voteOnIdea(
    _voteType: BigNumberish,
    _ideaId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  votes(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<[string, number] & { voter: string; voteType: number }>;

  callStatic: {
    ACCESS_PASS(overrides?: CallOverrides): Promise<number>;

    ACCESS_PASS_PRICE(overrides?: CallOverrides): Promise<number>;

    URI(overrides?: CallOverrides): Promise<string>;

    burnAccessPass(overrides?: CallOverrides): Promise<void>;

    commentOnIdea(
      _text: string,
      _ideaId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    comments(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        text: string;
        createdBy: string;
        createdAt: BigNumber;
      }
    >;

    createIdea(
      _title: string,
      _description: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasAccessPass(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    ideas(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string, string] & {
        id: BigNumber;
        title: string;
        upvotes: BigNumber;
        downvotes: BigNumber;
        createdAt: BigNumber;
        createdBy: string;
        description: string;
      }
    >;

    mintAccessPass(overrides?: CallOverrides): Promise<void>;

    totalIdeas(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<number>;

    transferAccessPass(_to: string, overrides?: CallOverrides): Promise<void>;

    voteOnIdea(
      _voteType: BigNumberish,
      _ideaId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    votes(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[string, number] & { voter: string; voteType: number }>;
  };

  filters: {
    "IdeaCreated(uint64)"(_ideaId?: null): IdeaCreatedEventFilter;
    IdeaCreated(_ideaId?: null): IdeaCreatedEventFilter;

    "IdeaVotesUpdated(uint64,uint8)"(
      _voteId?: null,
      _voteType?: null
    ): IdeaVotesUpdatedEventFilter;
    IdeaVotesUpdated(
      _voteId?: null,
      _voteType?: null
    ): IdeaVotesUpdatedEventFilter;
  };

  estimateGas: {
    ACCESS_PASS(overrides?: CallOverrides): Promise<BigNumber>;

    ACCESS_PASS_PRICE(overrides?: CallOverrides): Promise<BigNumber>;

    URI(overrides?: CallOverrides): Promise<BigNumber>;

    burnAccessPass(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commentOnIdea(
      _text: string,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    comments(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createIdea(
      _title: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasAccessPass(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    ideas(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    mintAccessPass(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalIdeas(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferAccessPass(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    voteOnIdea(
      _voteType: BigNumberish,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    votes(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ACCESS_PASS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ACCESS_PASS_PRICE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    URI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    burnAccessPass(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commentOnIdea(
      _text: string,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    comments(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createIdea(
      _title: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasAccessPass(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ideas(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintAccessPass(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalIdeas(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferAccessPass(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    voteOnIdea(
      _voteType: BigNumberish,
      _ideaId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    votes(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
