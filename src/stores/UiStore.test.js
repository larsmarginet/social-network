import UiStore from '../stores/UiStore'
import DataStore from '../stores/DataStore'
import User from '../models/User'
import Thread from '../models/Thread'

test("Create a UiStore", () => {
    const uiStore = new UiStore();
    expect(uiStore.commentForm).toBe(false);
    expect(uiStore.answer).toBe(undefined);
});

test("Open comment form", () => {
    const uiStore = new UiStore();
    expect(uiStore.commentForm).toBe(false);
    uiStore.openCommentForm(true);
    expect(uiStore.commentForm).toBe(true);
});

test("Open answer form", () => {
    const uiStore = new UiStore();
    const dataStore = new DataStore();
    const user = new User({ name: "test", store: dataStore });
    const thread = new Thread({ administrator: user, store: dataStore });
    const comment = new Comment({ text: "test", user: user, thread: thread });
    uiStore.openAnswerForm(comment, true);
    expect(uiStore.answer.answerForm).toBe(true);
});