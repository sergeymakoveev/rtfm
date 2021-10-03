"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var remote_data_ts_1 = require("@devexperts/remote-data-ts");
var function_1 = require("fp-ts/lib/function");
var react_1 = require("react");
var pipeable_1 = require("fp-ts/lib/pipeable");
var sink2_utils_1 = require("@devexperts/rx-utils/dist/sink2.utils");
var context2_utils_1 = require("@devexperts/rx-utils/dist/context2.utils");
var observable_utils_1 = require("@devexperts/rx-utils/dist/observable.utils");
var operators_1 = require("rxjs/operators");
var react_dom_1 = require("react-dom");
var useObservable = function (fa, initial) {
    var _a = react_1.useState(initial), a = _a[0], setA = _a[1];
    // create subscription immediately
    var subscription = react_1.useMemo(function () { return fa.subscribe(setA); }, [fa]);
    react_1.useEffect(function () { return function () { return subscription.unsubscribe(); }; }, [subscription]);
    return a;
};
var useSink = function (factory, dependencies) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var sa = react_1.useMemo(factory, dependencies);
    // create subscription immediately
    var subscription = react_1.useMemo(function () { return sa.effects.subscribe(); }, [sa]);
    react_1.useEffect(function () { return function () { return subscription.unsubscribe(); }; }, [subscription]);
    return sa.value;
};
var renderRemoteData = function (onSuccess) {
    return remote_data_ts_1.fold(function_1.constNull, function () { return react_1.createElement('div', null, 'pending'); }, function () { return react_1.createElement('div', null, 'failure'); }, onSuccess);
};
var UserProfile = react_1.memo(function (props) {
    return pipeable_1.pipe(props.name, renderRemoteData(function (name) { return react_1.createElement('div', null, name); }));
});
var newUserProfileViewModel = context2_utils_1.context.combine(context2_utils_1.context.key()('userService'), function (userService) { return function (id) {
    var _a = observable_utils_1.observable.createAdapter(), updateName = _a[0], updateNameEvent = _a[1];
    var updateNameEffect = pipeable_1.pipe(updateNameEvent, operators_1.distinctUntilChanged(), operators_1.switchMap(function (name) { return userService.updateUserName(id, name); }), operators_1.share());
    return sink2_utils_1.newSink({
        name: userService.getUserName(id),
        updateName: updateName,
    }, updateNameEffect);
}; });
var UserProfileContainer = context2_utils_1.context.combine(newUserProfileViewModel, function (newUserProfileViewModel) {
    return react_1.memo(function (props) {
        var vm = useSink(function () { return newUserProfileViewModel(props.id); }, [props.id]);
        var name = useObservable(vm.name, remote_data_ts_1.pending);
        return react_1.createElement(UserProfile, { name: name, onNameUpdate: vm.updateName });
    });
});
var App = context2_utils_1.context.combine(UserProfileContainer, function (UserProfileContainer) {
    return react_1.memo(function (props) {
        return pipeable_1.pipe(props.userIds, renderRemoteData(function (ids) {
            return react_1.createElement('div', null, ids.map(function (id) { return react_1.createElement(UserProfileContainer, { key: id, id: id }); }));
        }));
    });
});
var newAppViewModel = context2_utils_1.context.combine(context2_utils_1.context.key()('userService'), function (userService) { return function () { return ({
    userIds: userService.getAllUserIds(),
}); }; });
var AppContainer = context2_utils_1.context.combine(App, newAppViewModel, function (App, newAppViewModel) {
    return react_1.memo(function () {
        var vm = react_1.useMemo(function () { return newAppViewModel(); }, []);
        var userIds = useObservable(vm.userIds, remote_data_ts_1.pending);
        return react_1.createElement(App, { userIds: userIds });
    });
});
var Root = context2_utils_1.context.combine(context2_utils_1.context.defer(AppContainer, 'userService'), userService, function (getAppContainer, userService) {
    return react_1.memo(function () {
        var AppContainer = useSink(function () { return getAppContainer({ userService: userService }); }, []);
        return react_1.createElement(AppContainer, {});
    });
});
var apiURL = '/api';
var Index = react_1.memo(function () {
    var Resolved = useSink(function () { return Root({ apiURL: apiURL }); }, []);
    return react_1.createElement(Resolved, {});
});
react_dom_1.render(react_1.createElement(Index), document.getElementById('root'));
