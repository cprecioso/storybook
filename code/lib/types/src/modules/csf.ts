/* eslint-disable @typescript-eslint/naming-convention */

import type {
  AnnotatedStoryFn,
  Args,
  ArgsEnhancer,
  ArgsFromMeta,
  ArgsStoryFn,
  ArgTypes,
  ArgTypesEnhancer,
  BaseAnnotations,
  ComponentAnnotations,
  ComponentId,
  ComponentTitle,
  Conditional,
  DecoratorApplicator,
  DecoratorFunction,
  Globals,
  GlobalTypes,
  IncludeExcludeOptions,
  InputType,
  LegacyAnnotatedStoryFn,
  LegacyStoryAnnotationsOrFn,
  LegacyStoryFn,
  LoaderFunction,
  Parameters,
  PartialStoryFn,
  PlayFunction,
  PlayFunctionContext,
  Renderer,
  SBArrayType,
  SBEnumType,
  SBIntersectionType,
  SBObjectType,
  SBOtherType,
  SBScalarType,
  SBType,
  SBUnionType,
  SeparatorOptions,
  StepFunction,
  StepLabel,
  StepRunner,
  StoryAnnotations,
  StoryAnnotationsOrFn,
  StoryContext,
  StoryContextForEnhancers,
  StoryContextForLoaders,
  StoryContextUpdate,
  StoryFn,
  StoryId,
  StoryIdentifier,
  StoryKind,
  StoryName,
  StrictArgs,
  StrictArgTypes,
  StrictGlobalTypes,
  StrictInputType,
  Tag,
  ViewMode as ViewModeBase,
} from '@storybook/csf';
import type { Addon_OptionsParameter } from './addons';

export type {
  AnnotatedStoryFn,
  Args,
  ArgsEnhancer,
  ArgsFromMeta,
  ArgsStoryFn,
  ArgTypes,
  ArgTypesEnhancer,
  BaseAnnotations,
  ComponentAnnotations,
  ComponentId,
  ComponentTitle,
  Conditional,
  DecoratorApplicator,
  DecoratorFunction,
  Renderer,
  Globals,
  GlobalTypes,
  IncludeExcludeOptions,
  InputType,
  LegacyAnnotatedStoryFn,
  LegacyStoryAnnotationsOrFn,
  LegacyStoryFn,
  LoaderFunction,
  Parameters,
  PartialStoryFn,
  PlayFunction,
  PlayFunctionContext,
  SBArrayType,
  SBEnumType,
  SBIntersectionType,
  SBObjectType,
  SBOtherType,
  SBScalarType,
  SBType,
  SBUnionType,
  SeparatorOptions,
  StepFunction,
  StepLabel,
  StepRunner,
  StoryAnnotations,
  StoryAnnotationsOrFn,
  StoryContext,
  StoryContextForEnhancers,
  StoryContextForLoaders,
  StoryContextUpdate,
  StoryFn,
  StoryId,
  StoryIdentifier,
  StoryKind,
  StoryName,
  StrictArgs,
  StrictArgTypes,
  StrictGlobalTypes,
  StrictInputType,
  Tag,
};

export interface CSF_Meta {
  id?: string;
  title?: string;
  component?: string;
  includeStories?: string[] | RegExp;
  excludeStories?: string[] | RegExp;
  tags?: Tag[];
}

export interface CSF_Story {
  id: string;
  name: string;
  parameters: Parameters;
  tags?: Tag[];
}

export type ViewMode = ViewModeBase | 'story' | 'info' | 'settings' | string | undefined;

type Layout = 'centered' | 'fullscreen' | 'padded' | 'none';

export interface StorybookParameters {
  options?: Addon_OptionsParameter;
  /** The layout property defines basic styles added to the preview body where the story is rendered. If you pass 'none', no styles are applied. */
  layout?: Layout;
}

export interface StorybookInternalParameters extends StorybookParameters {
  fileName?: string;
  docsOnly?: true;
}

export type Path = string;
