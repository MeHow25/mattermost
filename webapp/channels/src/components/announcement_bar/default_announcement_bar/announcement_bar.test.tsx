// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {waitFor, screen} from '@testing-library/react';
import React from 'react';
import {renderWithContext, userEvent} from 'tests/react_testing_utils';

import AnnouncementBar from 'components/announcement_bar/default_announcement_bar';

describe('components/announcement_bar/default_announcement_bar', () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetWidth',
    ) as PropertyDescriptor;
    const originalScrollWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth') as PropertyDescriptor;

    beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 20,
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
            configurable: true, value: 200,
        });
    });

    afterAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
        Object.defineProperty(HTMLElement.prototype, 'scrollWidth', originalScrollWidth);
    });

    test('should not show tooltip by default', () => {
        const wrapper = renderWithContext(<AnnouncementBar message={<span>{'Lorem Ipsum'}</span>}/>);

        wrapper.getByText('Lorem Ipsum');

        expect(wrapper.queryByRole('tooltip')).toBeNull();
    });

    test('should show tooltip on hover', async () => {
        const wrapper = renderWithContext(<AnnouncementBar message={<span>{'Lorem Ipsum'}</span>}/>);

        userEvent.hover(wrapper.getByText('Lorem Ipsum'));
        userEvent.hover(wrapper.getByText('Lorem Ipsum'));

        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeNull();
        });
    });
});
