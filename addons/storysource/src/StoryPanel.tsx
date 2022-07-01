import React from 'react';
import { API, useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/router';
import { SyntaxHighlighter } from '@storybook/components';

// TODO this is just broken. We need to figure out how to get selected & click-able areas on this new syntax-highlighter
// @ts-expect-error Typedefs don't currently expose `createElement` even though it exists
import { createElement as createSyntaxHighlighterElement } from 'react-syntax-highlighter';

import { SourceBlock, LocationsMap } from '@storybook/source-loader';

const StyledStoryLink = styled(Link)<{ to: string; key: string }>(({ theme }) => ({
  display: 'block',
  textDecoration: 'none',
  borderRadius: theme.appBorderRadius,
  color: 'inherit',

  '&:hover': {
    background: theme.background.hoverable,
  },
}));

const SelectedStoryHighlight = styled.div(({ theme }) => ({
  background: theme.background.hoverable,
  borderRadius: theme.appBorderRadius,
}));

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const areLocationsEqual = (a: SourceBlock, b: SourceBlock): boolean =>
  a.startLoc.line === b.startLoc.line &&
  a.startLoc.col === b.startLoc.col &&
  a.endLoc.line === b.endLoc.line &&
  a.endLoc.col === b.endLoc.col;

interface StoryPanelProps {
  api: API;
}

interface SourceParams {
  source: string;
  locationsMap?: LocationsMap;
}
export const StoryPanel: React.FC<StoryPanelProps> = ({ api }) => {
  const story = api.getCurrentStoryData();
  const selectedStoryRef = React.useRef<HTMLDivElement>(null);
  const { source, locationsMap }: SourceParams = useParameter('storySource', {
    source: 'loading source...',
  });
  const currentLocation = locationsMap
    ? locationsMap[
        Object.keys(locationsMap).find((key: string) => {
          const sourceLoaderId = key.split('--');
          return story.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1]);
        })
      ]
    : undefined;
  React.useEffect(() => {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);

  const createPart = ({ rows, stylesheet, useInlineStyles }: any) =>
    rows.map((node: any, i: number) =>
      createSyntaxHighlighterElement({
        node,
        stylesheet,
        useInlineStyles,
        key: `code-segment${i}`,
      })
    );

  const createStoryPart = ({
    rows,
    stylesheet,
    useInlineStyles,
    location,
    id,
    refId,
  }: {
    location: SourceBlock;
    id: string;
    refId?: string;
    rows: any;
    stylesheet: any;
    useInlineStyles: any;
  }) => {
    const first = location.startLoc.line - 1;
    const last = location.endLoc.line;

    const storyRows = rows.slice(first, last);
    const storySource = createPart({ rows: storyRows, stylesheet, useInlineStyles });
    const storyKey = `${first}-${last}`;

    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return (
        <SelectedStoryHighlight key={storyKey} ref={selectedStoryRef}>
          {storySource}
        </SelectedStoryHighlight>
      );
    }
    return (
      <StyledStoryLink to={refId ? `/story/${refId}_${id}` : `/story/${id}`} key={storyKey}>
        {storySource}
      </StyledStoryLink>
    );
  };

  const createParts = ({ rows, stylesheet, useInlineStyles }: any) => {
    const parts = [];
    let lastRow = 0;

    Object.keys(locationsMap).forEach((key) => {
      const location = locationsMap[key];
      const first = location.startLoc.line - 1;
      const last = location.endLoc.line;
      const { title, refId } = story;
      // source loader ids are different from story id
      const sourceIdParts = key.split('--');
      const id = api.storyId(title, sourceIdParts[sourceIdParts.length - 1]);
      const start = createPart({ rows: rows.slice(lastRow, first), stylesheet, useInlineStyles });
      const storyPart = createStoryPart({ rows, stylesheet, useInlineStyles, location, id, refId });

      parts.push(start);
      parts.push(storyPart);

      lastRow = last;
    });

    const lastPart = createPart({ rows: rows.slice(lastRow), stylesheet, useInlineStyles });

    parts.push(lastPart);

    return parts;
  };

  const lineRenderer = ({ rows, stylesheet, useInlineStyles }: any): React.ReactNode => {
    // because of the usage of lineRenderer, all lines will be wrapped in a span
    // these spans will receive all classes on them for some reason
    // which makes colours cascade incorrectly
    // this removed that list of classnames
    // @ts-ignore
    const myrows = rows.map(({ properties, ...rest }) => ({
      ...rest,
      // @ts-ignore
      properties: { className: [] },
    }));

    if (!locationsMap || !Object.keys(locationsMap).length) {
      return createPart({ rows: myrows, stylesheet, useInlineStyles });
    }

    const parts = createParts({ rows: myrows, stylesheet, useInlineStyles });

    return <span>{parts}</span>;
  };
  return story ? (
    <StyledSyntaxHighlighter
      language="jsx"
      showLineNumbers
      renderer={lineRenderer}
      format={false}
      copyable={false}
      padded
    >
      {source}
    </StyledSyntaxHighlighter>
  ) : null;
};
