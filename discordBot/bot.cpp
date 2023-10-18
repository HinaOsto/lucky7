#include <dpp/dpp.h>
#include "easyClient.h"
#include <Windows.h>

const std::string token{ "MTE2MTcwNDc3Mjk0OTI0NjA0Mw.GahTT5.pQzB-SD_xixJ5-TDFZVGtzUFyYtvLCIgOjQKL8" };

/*
	Get Websocket msg
	log websocket msg using discord bot
	create slash command for user to reply to websocket
	send websocket message using discord bot
*/

std::string msg = {};
using easywsclient::WebSocket;
WebSocket::pointer ws = WebSocket::from_url("ws://localhost:8080");

void createBotMessage(std::string& websocketMessage) {
	dpp::cluster bot(token);
	dpp::message onWebsocket = dpp::message(1164234707203002398, websocketMessage, dpp::mt_default);
	bot.message_create(onWebsocket);
}

std::string handleMessage(const std::string& message) {
	assert(ws);
	while (ws->getReadyState() != WebSocket::CLOSED) {
		msg = {};
		ws->poll();
		msg = message;
		if (!msg.empty()) {
			std::cout << msg;
			break;
		}
	}
	createBotMessage(msg);
	return msg;
}

void sendMessage(std::string sendMsg) {
	assert(ws);
	while (ws->getReadyState() != WebSocket::CLOSED) {
		ws->send(sendMsg);
		ws->poll();
		Sleep(1000);
		ws->poll();
		ws->dispatch(handleMessage);
		break;
	}
}


int main() {
	dpp::cluster bot(token);

	bot.on_log(dpp::utility::cout_logger());
	bot.on_slashcommand([&bot](const dpp::slashcommand_t& event) {
		if (event.command.get_command_name() == "hi") {
			//event.reply(msg);
			//dpp::message onWebsocket = dpp::message(1164231078555435140, msg, dpp::mt_default);
			//bot.message_create(onWebsocket);
			//msg = {};
		}
	});

	bot.on_interaction_create([&bot](const dpp::interaction_create_t& event) {
		if (event.command.type == dpp::it_application_command) {
			dpp::command_interaction cmd_data = std::get<dpp::command_interaction>(event.command.data);
			if (cmd_data.name == "sendmessage") {
				std::string message = std::get<std::string>(event.get_parameter("message"));
				sendMessage(message);
				event.reply("Message Sent");
			}
		}
	});

	bot.on_ready([&bot](const dpp::ready_t& event) {
		dpp::slashcommand sendMessageSocket("sendMessage", "Send the websocket a message", bot.me.id);
		sendMessageSocket.add_option(
			dpp::command_option(dpp::co_string, "message", "message to send websocket", false)
		);
		dpp::slashcommand hiCommand("hi", "say hello", bot.me.id);

		bot.global_command_create(hiCommand);
		bot.global_command_create(sendMessageSocket);
	});

	bot.start(dpp::st_wait);
	
}