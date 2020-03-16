import DataStore from '../stores/DataStore'
import User from '../models/User'
import Thread from '../models/Thread'
import Comment from '../models/Comment'

test('Create a user', () => {
    const dataStore = new DataStore();
    const user = new User({name: 'test', store: dataStore})
    expect(user.name).toBe('test');
    expect(user.store).toBe(dataStore);
});

test("Can't create a user without a store", () => {
    expect(() => new User({ name: "test" })).toThrow("No store");
});

test("DataStore must have a reference to a created user", () => {
    const dataStore = new DataStore();
    expect(dataStore.users.length).toBe(0);
    const user = new User({ name: "test", store: dataStore });
    expect(dataStore.users.length).toBe(1);
    expect(dataStore.users[0]).toStrictEqual(user);
});

test("Link a thread to a user", () => {
    const dataStore = new DataStore();
    const user = new User({ name: "testuser", store: dataStore });
    const thread = new Thread({ administrator: user, store: dataStore });
    expect(user.threads).toStrictEqual([]);
    user.linkThread(thread);
    expect(user.threads).toContain(thread);
    expect(user.threads[0].users).toContain(user);
});

test("Link a comment to a user", () => {
    const dataStore = new DataStore();
    const user = new User({ name: "testuser", store: dataStore });
    const thread = new Thread({ administrator: user, store: dataStore });
    expect(user.comments).toStrictEqual([]);
    const comment = new Comment({ text: "test", user: user, thread: thread });
    expect(user.comments.length).toBe(1);
    expect(user.comments).toContain(comment);
});