import UiStore from './UiStore';
import Comment from '../models/Comment';

test('open commenForm', function() {
    const uistore = new UiStore();
    uistore.openCommentForm(true);
    expect(uistore.commentForm).toBe(true);
});

test('open answerForm', function() {
    const uistore = new UiStore();
    const comment = new Comment({name: 'Test', date: '15/02/20', text: 'Test'});
    uistore.openAnswerForm(comment, true);
    expect(uistore.answer).toBe(comment);
    expect(comment.answerForm).toBe(true);
});